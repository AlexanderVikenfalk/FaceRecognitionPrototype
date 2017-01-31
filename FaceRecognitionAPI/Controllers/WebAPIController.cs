using FaceRecognitionAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace FaceRecognitionAPI.Controllers
{
    public class WebAPIController : ApiController
    {
        //_apiKey: Replace this with your own Project Oxford Emotion API key, please do not use my key. I inlcude it here so you can get up and running quickly but you can get your own key for free at https://www.projectoxford.ai/emotion 
        public const string _apiKey = "e82c658c702d477a8d635552a8ddf1c5";

        //_apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
        public const string _apiUrl = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender";

        //GET api/<controller>
        //public IEnumerable<string> Get(string url)
        public async Task<List<Class1>> Get(string url)
        {
            //MakeRequest(url);
            var response = await sendRequest(url);
            return response;
        }


        //static async Task MainAsync(string url)
        //public void Get(string url)
        //{

        //        string Url = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&subscription-key=e82c658c702d477a8d635552a8ddf1c5";


        //        HttpWebRequest request = WebRequest.Create(Url) as HttpWebRequest;
        //        request.Method = "POST";
        //        request.ContentType = " application/json";
        //        //request.Headers.Add("Authorization", token);



        //        string data = "[{url:http://pngimg.com/upload/face_PNG5660.png}]";
        //        using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        //        {
        //            streamWriter.Write(data);
        //            streamWriter.Flush();
        //            streamWriter.Close();
        //        }

        //        // Get response  
        //        HttpWebResponse myWebResponse = (HttpWebResponse)request.GetResponse();
        //        // Get the response stream  
        //        StreamReader reader = new StreamReader(myWebResponse.GetResponseStream());

        //        // Console application output  
        //        Console.WriteLine(reader.ReadToEnd());
        //        Console.ReadLine();

        //    }

        public async Task<List<Class1>> sendRequest(string imageUrl)
        {

            using (var httpClient = new HttpClient())
            {

                //setup HttpClient
                httpClient.BaseAddress = new Uri(_apiUrl);
                httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _apiKey);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //setup data object
                var dataObject = new URLData()
                {
                    url = imageUrl 
                };

                //setup httpContent object
                var dataJson = JsonConvert.SerializeObject(dataObject);
                HttpContent content = new StringContent(dataJson);
                content.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");

                //make request
                var response = await httpClient.PostAsync(_apiUrl, content);

                //read response and write to view

                var responseContent = await response.Content.ReadAsStringAsync();
                
                List<Class1> obj = JsonConvert.DeserializeObject<List<Class1>>(responseContent);
                


                return obj;

            }

            //return null;
        }

       








    }
}
