import React, { useState, useRef, useEffect } from 'react';
import {
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  Box,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import './form.css';
import { FcMoneyTransfer } from 'react-icons/fc';
import { BiReset } from 'react-icons/bi';
import {debounce} from "../../helpers/debounce";

const Form = () => {
  const ref = useRef(null);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(null);
  const [fromCountry, setFromCountry] = useState('USD');
  const [toCountry, setToCountry] = useState('');
  const [symbol, setSymbol] = useState(null);
  const [countryData, setCountryData] = useState([])

  const resetHandler = () => {
    setAmount(null);
    setPrice(0);
    setFromCountry('USD');
    setToCountry('');
    setSymbol(null);
  };

  const setAmountHandlerCallback = e => {
    if (e.target.value > 99999999) {
      alert('Number you have entered is too big');
      ref.current.click();
    }
    setAmount(e.target.value);
  };
  const setAmountHandler = debounce(setAmountHandlerCallback, 900)

  const setFromCountryHandler = e => {
    const fromValue = e.target.value;
    if (!fromValue) {
      setFromCountry(null);
      return;
    }
    setFromCountry(e.target.value);
  };

  const setToCountryHandler = e => {
    const toValue = e.target.value;
    if (!toValue) {
      setToCountry(null);
      setSymbol(null);
      return;
    }
    const [country] = countryData.filter(
      country => country.abbreviation === toValue
    );
    const toSymbol = country.symbol;
    setSymbol(toSymbol);
    setToCountry(e.target.value);
  };

  useEffect(() => {
    const fetchPriceData = async () => {
      const baseURL = `http://localhost:8080/api/list-values`;
      const data = await fetch(baseURL);
      const priceData = await data.json();
      setCountryData(priceData.map(({code, name}) => ({abbreviation: code, name})))
    };

    if (fromCountry) {
      fetchPriceData();
    }
  }, [fromCountry]);

  useEffect(() => {
    const fetchConvertPrice = async () => {
      const baseURL = `http://localhost:8080/api/convert`;
      const data = await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          from: fromCountry,
          to: toCountry,
          amount
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const convertPrice = await data.json();
      setPrice(convertPrice)
    }

    if (amount && toCountry && fromCountry) {
      fetchConvertPrice();
    } else {
      setPrice(0);
    }
  }, [amount, toCountry, fromCountry]);

  return (
    <div className="form-body">
      <Box as="form">
        <Stack spacing={4} py="1.5">
          <InputGroup alignItems={'center'}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2rem"
              children={<FcMoneyTransfer />}
            />
            <Input
              type={'number'}
              autoFocus={true}
              onChange={setAmountHandler}
              placeholder="Введите сумму"
              variant={'filled'}
            />
            <Button
              type="reset"
              px={'8px'}
              py={'12px'}
              fontSize={'1.3rem'}
              ml={'1'}
              ref={ref}
              onClick={resetHandler}
              colorScheme="teal"
              size="md"
            >
              <BiReset />
            </Button>
          </InputGroup>

          <Text mb="5px">Из </Text>
          <InputGroup size="sm">
            <Select
              disabled={amount === (0 || null || '')}
              onChange={setFromCountryHandler}
              variant={'filled'}
              placeholder="Выберите страну"
              size="md"
              rounded={'md'}
            >
              {countryData.map((country, index) => {
                return (
                  <option key={index} value={country.abbreviation}>
                    {country.name}
                  </option>
                );
              })}
            </Select>
          </InputGroup>

          <Text mb="5px">В </Text>
          <InputGroup size="sm">
            <Select
              disabled={amount === (0 || null || '')}
              onChange={setToCountryHandler}
              variant={'filled'}
              placeholder="Выберите страну"
              size="md"
              rounded={'md'}
            >
              {countryData.map((country, index) => {
                return (
                  <option key={index} value={country.abbreviation}>
                    {country.name}
                  </option>
                );
              })}
            </Select>
          </InputGroup>
        </Stack>
      </Box>

      <div className="bottom">
        <HStack mb={'5'} mt={'10'} justifyContent="center">
          <Text fontSize="2xl" fontWeight="600">
            Итого <br />
            <span
              style={{
                textAlign: 'center',
                fontWeight: '900',
                fontSize: '3.5rem',
              }}
            >
              {price
                ? parseInt(price.toFixed(2)).toLocaleString('en-US')
                : '0.00'}{' '}
              {price ? (
                <span style={{ color: '#3182CE' }}>{toCountry}</span>
              ) : null}
            </span>
          </Text>
        </HStack>
      </div>
    </div>
  );
};

export default Form;
