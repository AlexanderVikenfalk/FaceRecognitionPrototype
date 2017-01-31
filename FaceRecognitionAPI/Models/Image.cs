using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FaceRecognitionAPI.Models
{
    public class Image
    {
        [JsonProperty("imageUrl")]
        public string imageUrl { get; set; }
    }
}