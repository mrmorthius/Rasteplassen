using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace backend.Models
{
    [Table("brukere")]
    public class User
    {
        [Column("bruker_id")]
        [Key]
        public required int BrukerId { get; set; }
        [Required(ErrorMessage = "Brukernavn er påkrevd")]
        public required string Brukernavn { get; set; }
        [Required(ErrorMessage = "Email er påkrevd")]
        [EmailAddress(ErrorMessage = "Ugyldig e-postadresse")]
        public required string Email { get; set; }
        [Required(ErrorMessage = "Passord er påkrevd")]
        [MinLength(8, ErrorMessage = "Passord må være minst 8 tegn langt")]
        public required string Passord { get; set; }
        public required DateTime Laget { get; set; }
    }
}