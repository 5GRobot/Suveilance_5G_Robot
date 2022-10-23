import React from "react";
import battery from "../images/battery.png";

const gaugeWidth = 100;
const gaugeHeight = 30;
const gaugeContentWidth = gaugeWidth - 12;
const gaugeBarsNb = 10;
const gaugeBarWidth = gaugeContentWidth / gaugeBarsNb;
const gaugeBarMargin = 1;
const gaugeBarRadius = 10;

const styles = {
    container: {
        position: "relative",
        width: `${gaugeWidth}px`,
        height: `${gaugeHeight}px`
    },
    barsContainer: {
        width: `${gaugeWidth}px`,
        height: `${gaugeHeight}px`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // marginLeft: "3px"
    },
    barContainer: {
        // width: `${gaugeBarWidth}px`,
        height: `${gaugeHeight}px`,
        // paddingLeft: `${gaugeBarMargin}px`,
        // paddingRight: `${gaugeBarMargin}px`
    },
    bar: {
        width: `${gaugeBarWidth - gaugeBarMargin * 2}px`,
        height: "100%",
        backgroundColor: "#23c991",
        zIndex: 1
    },
    barFirst: {
        borderTopLeftRadius: `${gaugeBarRadius}px`,
        borderBottomLeftRadius: `${gaugeBarRadius}px`
    },
    barLast: {
        borderTopRightRadius: `${gaugeBarRadius}px`,
        borderBottomRightRadius: `${gaugeBarRadius}px`
    },
    barRed: {
        backgroundColor: "#8b0000"
    },
    bg: {
        position: "absolute",
        width: "69%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 0
    },
    barText: {
        position: 'absolute',
        // marginTop: `5px`,
        // marginRight : `200px`,
    },
    red: {
        textShadow: `-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black`,
        fontWeight: `bold`,
        color: "white"
    },
    green: {
        textShadow: `-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black`,
        fontWeight: `bold`,
        color: "white"
    }
    
};

const Battery = ({ percentage }) => {
    const percent10 = Math.round(percentage / gaugeBarsNb);
    const percentageArray = [...Array(percent10).keys()];

    return (
        <>
            <div style={styles.container}>
                <img src={battery} style={styles.bg} alt="BatteryBG" />
                <div style={styles.barsContainer}>
                    {percentageArray.map((ele, index) => (
                        <div key={index} style={styles.barContainer}>
                            {index === 0 ? (
                                <div
                                    key={index}
                                    style={{ ...styles.bar, ...styles.barFirst }}
                                />
                            ) : index === gaugeBarsNb - 1 ? (
                                <div key={index} style={{ ...styles.bar, ...styles.barLast }} />
                            ) : (
                                <div key={index} style={{ ...styles.bar }} />
                            )}
                        </div>
                    ))}
                     {/* <div style={styles.barText}>
                        {percentage < lowBattery && (
                            <span style={styles.red}> {percentage}% </span>
                        )}
                        {percentage >= lowBattery && (
                            <span style={styles.green}> {percentage}%</span>
                        )}
                    </div> */}
                </div>
             
            </div>

        </>
    );
};

export default Battery;
