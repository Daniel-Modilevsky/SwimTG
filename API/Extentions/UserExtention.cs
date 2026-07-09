using System.Security.Principal;
using API.DTOs;
using API.Entities;
using API.interfaces;

namespace API.Extentions;

public static class UserExtentions
{
    public static UserDto ToDto(this User user, IToken token)
    {
        var createdToken = token.CreateToken(user);
        user.ActiveToken = createdToken;
        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Token = createdToken,
            ImageUrl = ""
        };
    }
}