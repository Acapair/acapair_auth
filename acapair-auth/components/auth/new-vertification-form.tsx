"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { newVerification } from "@/actions/new-vertification";
import FormError from "@/components/errors/form-error";
import FormSuccess from "@/components/success/form-success";
import { Button } from "../ui/button";

export const NewVertificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (error || success) return;
    if (!token) {
      setError("Geçersiz token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        setError("Bir hata oluştu!");
      });
  }, [token, success, error]);
  return (
    <CardWrapper
      headerLabel="Lütfen hesabınızı doğrulayın"
      backButtonLabel="Geri dön"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center pb-5">
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          size="lg"
          onClick={onSubmit}
          disabled={!!error || !!success}
        >
          E-postanızı doğrulayın
        </Button>
      </div>
    </CardWrapper>
  );
};
