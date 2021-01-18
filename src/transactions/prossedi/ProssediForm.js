import {DateInput, ImageInput, ImageField, NumberInput, SimpleForm} from "react-admin";
import { Typography, Box } from '@material-ui/core';
import React from "react";
export const ProssediForm = props => {
    if(isBrowser){
        return (
            <SimpleForm {...props}>
                    <Box p="1em" fullWidth>
                        <Box display="flex">
                            <Box flex={1} mr="1em">
                                <Typography variant="h6" gutterBottom>Importi</Typography>
                                <DateInput source={"date"} fullWidth/>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <NumberInput source={"masterCard"} fullWidth/>
                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <NumberInput source={"maestro"} fullWidth/>
                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <NumberInput source={"visa"} fullWidth/>
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <NumberInput source={"amex"} fullWidth/>
                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <NumberInput source={"pagobancomat"} fullWidth/>
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex={1} ml="1em">
                                <Typography variant="h6" gutterBottom>Scontrino</Typography>
                                <ImageInput source="receipt" label="Scontrino" accept="image/*"
                                    placeholder={<p>Carica una foto</p>}>
                                    <ImageField source={"url"}/>
                                </ImageInput>
                            </Box>
                        </Box>
                    </Box>
            </SimpleForm>
        )
    } else {
        return (
            <SimpleForm {...props}>
                <DateInput source={"date"}/>
                <NumberInput source={"masterCard"}/>
                <NumberInput source={"maestro"}/>
                <NumberInput source={"visa"}/>
                <NumberInput source={"amex"}/>
                <NumberInput source={"pagobancomat"}/>
                <ImageInput source="receipt" label="Scontrino" accept="image/*"
                    placeholder={<p>Carica una foto</p>}>
                    <ImageField source={"url"}/>
                </ImageInput>
            </SimpleForm>
        )
    }
}