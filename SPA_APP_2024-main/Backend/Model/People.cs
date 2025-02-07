using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

public record People
{
    [Key]
    public int ID { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }

}
