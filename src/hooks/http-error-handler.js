import { useState, useEffect } from 'react'

export default axiosInstance => {

  const [error, setError] = useState(null);

  const reqInterceptor = axiosInstance.interceptors.request.use(request => {
    setError(null)

    return request;
  });

  const resInterceptor = axiosInstance.interceptors.response.use(res => res,
    error => {
      setError(null);
    });


  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor])

  const errorConfirmedHander = () => {
    setError(null)
  }

  return [error, errorConfirmedHander]
}