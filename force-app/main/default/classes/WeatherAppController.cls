public with sharing class WeatherAppController {
    
    @AuraEnabled
    public static  String getWeatherInfo(String cityName){
        String apiKey = 'e125d1e609f9c870ee27f475a0cc0679'; // System.label.weatherAPI
        String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid='+ apiKey;
        String response = getResponse(url);
        return response;
    }

    public static String getResponse(String url){
        // Instantiate a new http object
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');

        HttpResponse res = h.send(req);
        return res.getBody();
    }
}
