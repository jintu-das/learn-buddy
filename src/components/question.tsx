import { useState } from "react";
import { Question } from "../data/interface";
import {
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  useTheme,
} from "@mui/material";

interface ILessonQuestion {
  question: Question;
  setCount: Function;
}

export default function LessonQuestion({
  question,
  setCount,
}: ILessonQuestion) {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === question.answer) {
      setHelperText("You got it!");
      setError(false);
      setCount((map: any) => new Map(map.set(question.id, value)));
    } else if (value !== question.answer) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        error={error}
        key={question.id}
        sx={{
          marginY: 4,
          display: "block",
        }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          id={`${question.question}-${question.id}`}
        >
          {question.question}
        </Typography>

        <RadioGroup
          name="radio-buttons-group"
          value={value}
          onChange={handleRadioChange}
        >
          {question.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: theme.typography.body2,
                },
              }}
            />
          ))}
        </RadioGroup>
        <FormHelperText sx={{ mb: 1 }}>{helperText}</FormHelperText>

        <Button type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
