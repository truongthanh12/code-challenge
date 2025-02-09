import React, { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { MenuItem, Typography } from "@mui/material";
import { StyledFormControl, StyledSelect } from "./CurrencySwapStyles";
import type { FormData } from "./CurrencySwapForm";

interface Token {
  currency: string;
  price: number;
}

interface CurrencySelectProps {
  name: "fromCurrency" | "toCurrency";
  control: Control<FormData>;
  tokens: Token[] | undefined;
}

const CurrencyLogo: React.FC<{ currency: string }> = ({ currency }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  if (imageError) {
    return (
      <Typography
        component="span"
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "#4A4A5C",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
          marginRight: 1,
        }}
      >
        {currency[0].toUpperCase()}
      </Typography>
    );
  }

  return (
    <img
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
      alt={currency}
      style={{ width: 24, height: 24, marginRight: 8 }}
      onError={handleImageError}
    />
  );
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  name,
  control,
  tokens,
}) => {
  return (
    <StyledFormControl>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${name} currency is required` }}
        render={({ field }) => (
          <StyledSelect {...field}>
            {tokens?.map((token, ind) => (
              <MenuItem key={token.currency + ind} value={token.currency}>
                <CurrencyLogo currency={token.currency} />
                {token.currency}
              </MenuItem>
            ))}
          </StyledSelect>
        )}
      />
    </StyledFormControl>
  );
};

export default React.memo(CurrencySelect);
