import React, { useState } from 'react';




const Sliders = ({ tittle,
                   basicMinValue,
                   basicMaxValue,
                   step,
                   minValueID,
                   maxValueID,
                   values,
                   setValues
}) => {


    
    const minVal = parseInt(basicMinValue);
    const maxVal = parseInt(basicMaxValue);

    const [sliderTrackBg, setSliderTrackBg] = useState({ minPercentage: (values.minimumValue - minVal) / ((maxVal - minVal) / 100),
                                                         maxPercentage: (values.maximumValue - minVal) / ((maxVal - minVal) / 100) })



    const handleMinValueChange = (e) => {

        if ( (parseInt(values.maximumValue) - parseInt(e.target.value)) <= 0 )
        {
            setValues({ ...values, minimumValue: values.maximumValue });
            setSliderTrackBg({ ...sliderTrackBg,
                minPercentage: (values.maximumValue - minVal) / ((maxVal - minVal) / 100)
            });
        }
        else
        {
            setValues({ ...values, minimumValue: e.target.value });
            setSliderTrackBg({ ...sliderTrackBg,
                minPercentage: (e.target.value - minVal) / ((maxVal - minVal) / 100)
            });
        }
    }

    const handleMaxValueChange = (e) => {

        if ( (parseInt(e.target.value) - parseInt(values.minimumValue)) <= 0 )
        {
            setValues({ ...values, maximumValue: values.minimumValue });
            setSliderTrackBg({  ...sliderTrackBg,
                maxPercentage: (values.minimumValue - minVal) / ((maxVal - minVal) / 100)
            });
        }
        else
        {
            setValues({ ...values, maximumValue: e.target.value });
            setSliderTrackBg({  ...sliderTrackBg,
                maxPercentage: (e.target.value - minVal) / ((maxVal - minVal) / 100)
            });
        }
    }


    return (
        <div className='range-filter-container-div'>
            <div className='range-value-display left'>{values.minimumValue}</div>
            <div className='range-filter-container'>
            <div className='range-tittle'>{tittle}</div>
                <div
                    className='slider-track'
                    style={{background:`linear-gradient(to right, #636e72 ${sliderTrackBg.minPercentage}%, black ${sliderTrackBg.minPercentage}%, black ${sliderTrackBg.maxPercentage}%, #636e72 ${sliderTrackBg.maxPercentage}%`}}
                ></div>
                <input
                    type="range"
                    className='range-filter'
                    id={minValueID}
                    name={minValueID}
                    min={basicMinValue}
                    max={basicMaxValue}
                    step={step}
                    value={values.minimumValue}
                    onChange={handleMinValueChange}
                />
                <input
                    type="range"
                    className='range-filter'
                    id={maxValueID}
                    name={maxValueID}
                    min={basicMinValue}
                    max={basicMaxValue}
                    step={step}
                    value={values.maximumValue}
                    onChange={handleMaxValueChange}
                />
            </div>
            <div className='range-value-display right'>{values.maximumValue}</div>
        </div>
    )
}

export default Sliders;