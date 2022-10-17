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
import { ConvertCurrency } from "../../utils";
const Pulsa = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [operator, setOperator] = React.useState("");

  const dataPaket = React.useContext(AppCtx);

  const changeOperator = (e: any) => {
    if (dataPaket) {
      const result = dataPaket?.filter((elm) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return elm.opertator === e.target.value && elm.type === "e-money";
      });
      if (result.length > 0) {
        setData(result);
        setTotalPrice(result[0].harga);
      }
    }
    setOperator(e.target.value);
  };

  const handleTotalPrice = (e: any) => {
    if (dataPaket) {
      const result = dataPaket?.filter((elm) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return (
          elm.opertator === operator &&
          elm.type === "pulsa" &&
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
        E-Money
      </Text>
      <Formik
        initialValues={{
          phone_number: "",
          name: "",
          operator: "",
          nominal: "",
        }}
        onSubmit={(values, actions) => {
          window.open(
            `https://api.whatsapp.com/send/?phone=6281218389762&text=No%20Handpone:%20${values.phone_number}%0AE-Money:%20${values.operator}%0ANama:%20${values.name}%0ANomimal%20Pulsa:%20${values.nominal}%0AHarga:%20${totalPrice}&type=phone_number&app_absent=0`
          );
        }}
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <FormControl
                isRequired
                isInvalid={props.errors.operator ? true : false}
              >
                <FormLabel>Pilih Emoney</FormLabel>
                <Field
                  as={Select}
                  placeholder="Pilih E-money"
                  id="operator"
                  name="operator"
                  type="operator"
                  variant="filled"
                  onChange={(e: any) => {
                    changeOperator(e);
                    props.handleChange(e);
                  }}
                  setValues
                >
                  <option value="ovo">Ovo</option>
                  <option value="dana">Dana</option>
                  <option value="shopee">Shopee</option>
                  <option value="gopay">Gopay</option>
                </Field>
                <FormErrorMessage color={"red"}>
                  {props.errors.operator}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  props.touched.name && props.errors.name ? true : false
                }
              >
                <FormLabel>Masukan Nama</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="name"
                  variant="filled"
                  validate={(value: string) => {
                    let error;

                    if (value.length < 5) {
                      error = "Mininal 5 karakter";
                    }
                    return error;
                  }}
                />
                <FormErrorMessage color={"red"}>
                  {props.touched.name && props.errors.name}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  props.touched.phone_number && props.errors.phone_number
                    ? true
                    : false
                }
              >
                <FormLabel>Masukan Nomor Hp</FormLabel>
                <Field
                  as={Input}
                  id="phone_number"
                  name="phone_number"
                  type="phone_number"
                  variant="filled"
                  validate={(value: string) => {
                    let error;
                    const regExp = /[a-zA-Z]/g;

                    if (value.length < 10) {
                      error = "Nomor hp minimal 10 angka";
                    }
                    if (regExp.test(value)) {
                      error = "Hanya Boleh angka";
                    }
                    return error;
                  }}
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
                  onChange={(e: any) => {
                    props.handleChange(e);
                    handleTotalPrice(e);
                  }}
                >
                  {data.map((val) => (
                    <option>{val.nama}</option>
                  ))}
                </Field>
              </FormControl>
              <Text mt={5}>
                Total Harga:   {ConvertCurrency(totalPrice)}{" "}
              </Text>
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

export default Pulsa;
