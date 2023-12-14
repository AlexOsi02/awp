package com.osipov.lab3.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CurrencyDto {
    private String code;
    private String name;
}
