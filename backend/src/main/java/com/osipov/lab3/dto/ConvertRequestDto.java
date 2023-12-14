package com.osipov.lab3.dto;

import lombok.Data;

@Data
public class ConvertRequestDto {
    private String from;
    private String to;
    private String amount;
}
