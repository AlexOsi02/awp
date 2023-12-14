package com.osipov.lab3.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeAdapter extends XmlAdapter<String, LocalDateTime> {
    @Override
    public LocalDateTime unmarshal(String value) throws Exception {
        if (value == null) {
            return null;
        }

        return LocalDateTime.parse(value);
    }

    @Override
    public String marshal(LocalDateTime value) throws Exception {
        if (value == null) {
            return null;
        }

        return value.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }
}
