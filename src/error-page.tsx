import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div id='error-page'>
      <h1>이런!</h1>
      <p>죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

type Error = {
  statusText?: string;
  message?: string;
};
