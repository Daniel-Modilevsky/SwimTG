using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto {
    [Required]
    [EmailAddress]
    public string email {get; set; } = "";

    [Required]
    [MinLength(4)]
    public string password {get; set; } = "";
}