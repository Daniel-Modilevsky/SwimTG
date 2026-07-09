
using API.Entities;

namespace API.interfaces;

public interface IToken
{
    string CreateToken(User user);
}