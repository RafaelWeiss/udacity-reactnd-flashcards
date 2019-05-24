import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';

function Container(props) {
    return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>{props.children}</View>
        </ThemeProvider>
    );
}

Container.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
