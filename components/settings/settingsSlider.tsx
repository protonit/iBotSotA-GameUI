import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Grid, Input, Slider, Typography} from "@material-ui/core";
import PropTypes from "prop-types";

export function SettingsSlider(props: any) {
    const { label, icon, initialValue, handleChange } = props;
    const useStyles = makeStyles({
        root: {
            width: 200,
        },
        input: {
            width: 42,
        },
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(initialValue);

    const handleSliderChange = (event: any, newValue: any) => {
        setValue(newValue);
        handleChange(event, label, newValue);
    };

    const handleInputChange = (event: any) => {
        let val = event.target.value === '' ? 0 : Number(event.target.value);
        setValue(val);
        handleChange(event, label, val);
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };


    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                {label}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {icon}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Input
                    className={classes.input}
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 1,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
        </div>

    );
}

SettingsSlider.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.any.isRequired,
    handleChange: PropTypes.any.isRequired,
};