using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("rasteplasser")]
    public class Rasteplass
    {
        [Key]
        public int rasteplass_id { get; set; }
        public required int vegvesen_id { get; set; }
        public required string geo_kommune { get; set; }
        public required string geo_fylke { get; set; }
        [Required]
        public required string rasteplass_navn { get; set; }
        public required string rasteplass_type { get; set; }
        [Required]
        [Column(TypeName = "decimal(9,6)")]
        public required decimal rasteplass_lat { get; set; }
        [Required]
        [Column(TypeName = "decimal(9,6)")]
        public required decimal rasteplass_long { get; set; }
        
        public required bool rasteplass_toalett { get; set; }
        
        public required bool rasteplass_tilgjengelig { get; set; }
        
        public required string rasteplass_informasjon { get; set; }
        
        public required string rasteplass_renovasjon { get; set; }
        
        public DateTime laget { get; set; }
        
        public DateTime oppdatert { get; set; }
    }
}
