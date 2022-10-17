import React from "react";
import {
  Text,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { AppCtx } from "../../Contex";
import { Field, Form, Formik } from "formik";
const Token = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const dataPaket = React.useContext(AppCtx);

  React.useEffect(() => {
    if (dataPaket) {
      const result = dataPaket?.filter((elm) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return elm.type === "token";
      });
      if (result.length > 0) {
        setData(result);
      }
    }
  }, [dataPaket]);

  const handleTotalPrice = (e: any) => {
    if (dataPaket) {
    const result = dataPaket?.filter((elm) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return (
        elm.type === "token" &&
        elm.nama === e.target.value
      );
    });
    if (result.length > 0) {
      setTotalPrice(result[0].harga);
    }
  }
};

  return (
    <div>
      <Text
        fontSize={24}
        textAlign={"center"}
        fontWeight={600}
        mt={"3vh"}
        mb={10}
      >
        Token Listrik
      </Text>
      <Formik
        initialValues={{
          nomor_meter: "",
          phone_number: "",
          nominal: "",
        }}
        onSubmit={(values, actions) => {
          window.open(
            `https://api.whatsapp.com/send/?phone=6281218389762&text=No%20Meter:%20${values.nomor_meter}%0ANo.Handphone:%20${values.phone_number}%0ANomimal%20Pulsa:%20${values.nominal}%0AHarga:%20${totalPrice}&type=phone_number&app_absent=0`
          );
        }}
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <FormControl
                isRequired
                isInvalid={props.touched.nomor_meter && props.errors.nomor_meter ? true : false}
              >
                <FormLabel>Masukan Nomor Meter</FormLabel>
                <Field
                  as={Input}
                  id="nomor_meter"
                  name="nomor_meter"
                  type="nomor_meter"
                  variant="filled"
                  validate={(value: string) => {
                    let error;
                    const regExp = /[a-zA-Z]/g;

                    if (value.length < 5) {
                      error = "Mininal 10 karakter";
                    }
                    if (regExp.test(value)) {
                        error = "Hanya Boleh angka";
                      }
                    return error;
                  }}
                />
                <FormErrorMessage color={"red"}>
                  { props.touched.nomor_meter && props.errors.nomor_meter}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Masukan Nomor Hp</FormLabel>
                <Field
                  as={Input}
                  id="phone_number"
                  name="phone_number"
                  type="phone_number"
                  variant="filled"
                />
                <FormErrorMessage color={"red"}>
                  {props.touched.phone_number && props.errors.phone_number}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  props.touched.nominal && props.errors.nominal ? true : false
                }
              >
                <FormLabel>Nominal</FormLabel>
                <Field
                  as={Select}
                  id="nominal"
                  name="nominal"
                  type="nominal"
                  variant="filled"
                  placeholder="Pilih nominal"
                  onChange={(e: any) => {
                    props.handleChange(e);
                    handleTotalPrice(e);
                  }}
                >
                  {data.map((val) => (
                    <option>
                      {val.nama}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <Text mt={5}>Total Harga: Rp. {totalPrice} </Text>
              <Button mt={5} type="submit" colorScheme="purple" width="full">
                Pesan
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Token;
