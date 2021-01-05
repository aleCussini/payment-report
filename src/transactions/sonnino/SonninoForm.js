import {DateInput, ImageInput, NumberInput, SimpleForm} from "react-admin";
import { Typography, Box } from '@material-ui/core';
import React from "react";

export const SonninoForm = props => {
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
                                    <NumberInput source={"diners"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"pagobancomat"} fullWidth/>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"unionPay"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"selfBancomat"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"multicardRoutex"} fullWidth/>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"eniMobilePayments"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"eniBce"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"uta"} fullWidth/>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em" >
                                    <NumberInput source={"cartaDiCreditoGenerica"} fullWidth/>
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <NumberInput source={"elettroBlu"} fullWidth/>
                                </Box>
                            </Box>
                            <Box mt="1em" />
                        </Box>
                        <Box flex={1} ml="1em">
                            <Typography variant="h6" gutterBottom>Scontrino</Typography>
                            <ImageInput source={"receipt"}/>
                        </Box>
                    </Box>
                </Box>
        </SimpleForm>
    )
}