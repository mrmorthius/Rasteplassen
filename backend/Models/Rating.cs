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
    [Table("vurderinger")]
    public class Rating
    {
        [Key]
        [Required(ErrorMessage = "vurdering_id er påkrevd")]
        public int vurdering_id { get; set; }

        [Range(0, 5)]
        [Required(ErrorMessage = "Vurdering er påkrevd")]
        public required int vurdering { get; set; }

        [Required(ErrorMessage = "Skriv en kommentar")]
        public required string kommentar { get; set; }

        public string? ip_adresse { get; set; }
        public DateTime laget { get; set; }

        [Required(ErrorMessage = "Vurdering må knyttes til rasteplass")]
        public required int rasteplass_id { get; set; }

        [JsonIgnore]
        [ForeignKey("rasteplass_id")]
        public Rasteplass? rasteplass { get; set; }

        public int? bruker_id { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [ForeignKey("bruker_id")]
        public User? user { get; set; }
    }
}
