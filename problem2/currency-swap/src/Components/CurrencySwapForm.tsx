import type React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { ArrowDownUp as SwapVertical } from "lucide-react";
import {
  SwapContainer,
  Title,
  StyledTextField,
  SwapResult,
  FormHelperText,
  SwapIconWrapper,
  StyledBoxContainer,
} from "./CurrencySwapStyles";
import CurrencySelect from "./CurrencySelect";

interface Token {
  currency: string;
  price: number;
}

export interface FormData {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
}

const fetchPrices = async (): Promise<Token[]> => {
  const { data } = await axios.get(
    "https://interview.switcheo.com/prices.json"
  );
  return data.filter((token: Token) => token.price && token.price > 0);
};

const formatNumber = (value: string) => {
  const cleanedValue = value.replace(/[^\d.]/g, "");
  const parts = cleanedValue.split(".");
  return parts[0] + (parts.length > 1 ? "." + parts.slice(1).join("") : "");
};

const CurrencySwapForm: React.FC = () => {
  const [estimatedAmount, setEstimatedAmount] = useState<string | null>(null);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fromCurrency: "",
      toCurrency: "",
      amount: "",
    },
  });

  const { data: tokens, isLoading } = useQuery("tokens", fetchPrices, {
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setValue("fromCurrency", data[0].currency);
        setValue("toCurrency", data[1]?.currency || data[0].currency);
      }
    },
  });

  const watchFields = watch();

  const handleSwapDirections = () => {
    const from = watchFields.fromCurrency;
    const to = watchFields.toCurrency;
    setValue("fromCurrency", to);
    setValue("toCurrency", from);
  };

  const calculateEstimatedAmount = useCallback(() => {
    if (tokens && watchFields.amount && watchFields.fromCurrency && watchFields.toCurrency) {
      const fromToken = tokens.find((t) => t.currency === watchFields.fromCurrency)
      const toToken = tokens.find((t) => t.currency === watchFields.toCurrency)

      if (fromToken && toToken) {
        const estimated = (Number.parseFloat(watchFields.amount) * fromToken.price) / toToken.price
        return `${estimated.toLocaleString("en-US", {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })} ${watchFields.toCurrency}`
      }
    }
    return null
  }, [watchFields.amount, watchFields.fromCurrency, watchFields.toCurrency, tokens])

  useEffect(() => {
    const estimated = calculateEstimatedAmount()
    setEstimatedAmount(estimated)
  }, [calculateEstimatedAmount])

  if (isLoading) {
    return (
      <StyledBoxContainer>
        <CircularProgress sx={{ color: "#7C3AED" }} />
      </StyledBoxContainer>
    );
  }

  return (
    <StyledBoxContainer
      sx={{
        backgroundColor: "#13131A",
      }}
    >
      <SwapContainer>
        <Title>Swap</Title>

        <CurrencySelect name="fromCurrency" control={control} tokens={tokens} />

        <Box position="relative">
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              validate: (value) => {
                const num = Number.parseFloat(value);
                return (
                  (num > 0 && !isNaN(num)) || "Amount must be greater than 0"
                );
              },
            }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="0.00"
                fullWidth
                value={field.value}
                onChange={(e) => field.onChange(formatNumber(e.target.value))}
                error={!!errors.amount}
                inputProps={{ inputMode: "decimal", pattern: "[0-9]*" }}
              />
            )}
          />
          {errors.amount?.message && (
            <FormHelperText>{errors.amount?.message}</FormHelperText>
          )}
        </Box>

        <SwapIconWrapper>
          <IconButton
            onClick={handleSwapDirections}
            sx={{
              backgroundColor: "#2B2B3C",
              color: "#7C3AED",
              "&:hover": {
                backgroundColor: "#3F3F4D",
              },
            }}
          >
            <SwapVertical size={20} />
          </IconButton>
        </SwapIconWrapper>

        <CurrencySelect name="toCurrency" control={control} tokens={tokens} />

        {estimatedAmount && !errors.amount && (
          <SwapResult>Estimated: {estimatedAmount}</SwapResult>
        )}
      </SwapContainer>
    </StyledBoxContainer>
  );
};

export default memo(CurrencySwapForm);
