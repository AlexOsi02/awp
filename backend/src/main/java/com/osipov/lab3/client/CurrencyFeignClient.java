package com.osipov.lab3.client;

import com.fasterxml.jackson.databind.JsonNode;
import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "currencyClient", url = "http://api.currencylayer.com")
public interface CurrencyFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "/list?access_key={acccessKey}")
    JsonNode getList(@RequestParam("acccessKey") String accessKey);

    @RequestMapping(method = RequestMethod.GET, value = "/convert?access_key={acccessKey}&from={from}&to={to}&amount={amount}")
    JsonNode convert(@RequestParam("acccessKey") String accessKey,
                     @RequestParam("from") String from,
                     @RequestParam("to") String to,
                     @RequestParam("amount") String amount);
}
