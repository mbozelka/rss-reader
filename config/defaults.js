'use strict';

const port_num = 3000;
const dev_dir_name = 'src';
const dist_dir_name = 'public';
const entry_file = 'index.js';
const html_file = 'index.html';
const max_image_size = 100000;
const vendors = [
    'react',
    'react-dom',
    'react-redux',
    'redux'
]

const font_reg = /\.(eot|svg|ttf|woff|woff2)$/;
const img_reg = /\.(jpe?g|png|gif|svg)$/;

const dev_path = './' + dev_dir_name + '/';
const dist_path = './' + dist_dir_name + '/';

const default_config = {
    DEV_ENTRY: dev_path + entry_file,
    DEV_DIR_NAME: dev_dir_name,
    HTML_TEMP: dev_path + html_file,
    PORT: port_num,
    HOST: 'http://localhost:' + port_num + '/',
    PUBLIC_DIR_NAME: dist_dir_name,
    PUBLIC_ENTRY: dist_path + html_file,
    MAX_INT_IMAGE_SIZE: max_image_size,
    VENDOR_LIBS: vendors,
    FONTS: font_reg,
    IMG: img_reg
};

module.exports = default_config;