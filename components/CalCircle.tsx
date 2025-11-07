
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// --- Configuration ---
const calories = 2;  // The current value
const maxCals = 150; // The max value
const size = 240;     // The total size of the component (was 120 radius * 2)
const strokeWidth = 20;
const remainingCals = maxCals - calories;
// ---------------------

// --- Calculations ---
const progressPercentage = (calories / maxCals) * 100;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;
const strokeDashoffset = circumference - (circumference * progressPercentage) / 100;

export function CalCircle() {
  return (
    <View style={{ width: size, height: size }}>
      {/* The SVG container */}
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        
        {/* Background Circle (the inactive part) */}
        <Circle
          stroke="#555555" // Your inActiveStrokeColor
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeOpacity={0.5} // Your inActiveStrokeOpacity
        />
        
        {/* Progress Circle (the active part) */}
        <Circle
          stroke="#00FF00" // Your activeStrokeColor
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from the top
        />
      </Svg>
      
      {/* Text in the middle */}

      <View style={styles.textContainer}>
        <Text style={styles.valueText}>{remainingCals}</Text>
        <Text style={styles.titleText}>Remaining</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: size / 4, // Make text proportional to size
    fontWeight: 'bold',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: size / 10, // Make text proportional to size
    fontWeight: 'bold',
  },
});

export default CalCircle;