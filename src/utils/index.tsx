import { FormEvent } from 'react';

export function getFormValue(e: FormEvent<HTMLFormElement>, name: string) {
  return (e.currentTarget.elements.namedItem(name) as HTMLInputElement).value;
}
