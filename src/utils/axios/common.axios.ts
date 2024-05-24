import { API_HOST } from '../config/common';
import axios from "axios";

import { commonConfig } from "../config";
import { commonHelpers } from "../helpers";
import router from 'next/router';
import { gotoPage } from '../helpers/common';
import { toast } from 'react-toastify';
import { i18n } from 'next-i18next';

const commonAxios = axios.create({
  baseURL: 'http://dev-vn.vtl-lab.com:8296/',
});

commonAxios.interceptors.request.use(
  (req) => {
    if (!req['headers'].Language) {
      const language = "en_US";
      req['headers'].Language = language;
    }

    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {};
        // Object.assign(req.params, {});
        break;
      }
      case "POST": {
        if (!(req.data ) && !!req.data) {
          req.data = commonHelpers.formatFormData(req.data);
        }

        // if (req.data instanceof FormData) {
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
      case "PUT": {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = commonHelpers.formatFormData(req.data);
        }
        // if (req.data instanceof FormData) {
        //   // req.data.append("language", window.NextPublic.lang);
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
    }
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

commonAxios.interceptors.response.use(
  (res) => {
    // if (!["", null, undefined].includes(res?.data?.error_code)) {
    // 	// helpers.axios.allocateRoute(res.data.error_code)
    // }
    return res;
  },
  (err) => {
    // console.log(err);
    const { status, data } = err.response;
    if (status === 401) {
      // toast.error("error unauthorized")
      // alert('Login session is expired!')
      // localStorage.removeItem('token-metro')
      // gotoPage('/signIn')
    }
    else if (data && data.message) {
      toast.error(data.message);
    }
    else {
      toast.error('Network error');
    }
    return Promise.reject(err);
  }
);

export default commonAxios;
