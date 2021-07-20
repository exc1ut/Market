import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface RangeInputProps {
  watcher: any;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  name: string;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  control,
  name,
  watcher,
  register,
}) => {
  return (
    <FormControl>
      <FormLabel>Максимальная скидка</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Slider
            {...field}
            step={0.1}
            aria-label="slider-ex-1"
            value={watcher}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        )}
      />
      <FormHelperText>
        <Input w={35} variant="unstyled" value={watcher} {...register(name)} />%
      </FormHelperText>
    </FormControl>
  );
};
