import * as React from 'react';
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';

const BrowserLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default BrowserLayout;