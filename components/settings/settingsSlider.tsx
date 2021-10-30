import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Grid, Input, Slider, Typography} from "@material-ui/core";
import PropTypes from "prop-types";

export function SettingsSlider(props: any) {
    const { nameSpace, name, label, icon, initialValue, handleChange } = props;
    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
        input: {
            width: 42,
        },
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(initialValue);

    const handleSliderChange = (event: any, newValue: any) => {
        setValue(newValue);
        handleChange(event, nameSpace, name, newValue);
    };

    const handleInputChange = (event: any) => {
        let val = event.target.value === '' ? 0 : Number(event.target.value);
        setValue(val);
        handleChange(event, nameSpace, name, val);
    };

    const step = props?.step ?? 1;
    const min = props?.min ?? 0;
    const max = props?.max ?? 100;
    
    const handleBlur = () => {
        if (value < min) {
            setValue(min);
        } else if (value > max) {
            setValue(max);
        }
    };


    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography id="continuous-slider" gutterBottom>
                        {label}
                    </Typography>
                </Grid>
                <Grid item>
                    {icon}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        step={step}
                        min={min}
                        max={max}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: min,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>

    );
}

SettingsSlider.propTypes = {
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    icon: PropTypes.node,
    nameSpace: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.any.isRequired,
    initialValue: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired
};