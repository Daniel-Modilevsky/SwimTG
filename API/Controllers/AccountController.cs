using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, IToken token) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await EmailExists(registerDto.email))
            return BadRequest("Email exists");

        using var hmac = new HMACSHA512();
        var user = new User
        {
            Name = registerDto.name,
            Email = registerDto.email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
            PasswordSalt = hmac.Key
        };
        context.Users.Add(user);
        var dto = user.ToDto(token);
        await context.SaveChangesAsync();
        return dto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.email);
        if (user == null)
            return Unauthorized("Email not found");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
        if (!MemoryExtensions.SequenceEqual(computedHash.AsSpan(), user.PasswordHash.AsSpan()))
            return Unauthorized("Password did not match");

        var dto = user.ToDto(token);
        await context.SaveChangesAsync();
        return dto;
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var user = await context.Users.FindAsync(userId);
        if (user == null) return Unauthorized();

        user.ActiveToken = null;
        await context.SaveChangesAsync();
        return Ok();
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
