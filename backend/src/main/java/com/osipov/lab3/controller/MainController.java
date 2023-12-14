package com.osipov.lab3.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.osipov.lab3.client.CurrencyFeignClient;
import com.osipov.lab3.dto.ConvertRequestDto;
import com.osipov.lab3.dto.CurrencyDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {
    private static final String CURRENCIES_FIELD = "currencies";

    @Value("${access.key}")
    private String accessKey;
    private final CurrencyFeignClient currencyFeignClient;

    @GetMapping("/list-values")
    public List<CurrencyDto> getCursList() {
        List<CurrencyDto> result = new ArrayList<>();
        JsonNode node = currencyFeignClient.getList(accessKey);
        ObjectNode objectNode = (ObjectNode) node.get(CURRENCIES_FIELD);
        objectNode.fieldNames().forEachRemaining(name -> result.add(CurrencyDto.builder()
                .code(name)
                .name(objectNode.get(name).asText())
                .build()));

        return result;
    }

    @PostMapping("/convert")
    public String convert(@RequestBody ConvertRequestDto requestDto) {
        JsonNode node = currencyFeignClient.convert(accessKey,
                requestDto.getFrom(),
                requestDto.getTo(),
                requestDto.getAmount());

        return node.get("result").asText();
    }
}
