import React from "react";
import {
  Text,
  Select,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from "@chakra-ui/react";
import { AppContextInterface, AppCtx } from "../../Contex";
import { Field, Form, Formik, FieldAttributes, useFormik } from "formik";

const PaketData = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [detailPaket, setDetailPaket] = React.useState(
    {} as AppContextInterface
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataPaket = React.useContext(AppCtx);

  const changeOperator = (e: any) => {
    if (dataPaket) {
      const result = dataPaket?.filter((elm) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return elm.opertator === e.target.value && elm.type === "kuota";
      });
      if (result.length > 0) {
        setData(result);
      }
    }
  };

  const handleOrder = (data: AppContextInterface) => {
    setDetailPaket(data);
    onOpen();
  };

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Text
        fontSize={24}
        textAlign={"center"}
        fontWeight={600}
        mt={"10vh"}
        mb={10}
      >
        Paket Data
      </Text>
      <Select
        placeholder="Pilih Operator"
        width={220}
        onChange={changeOperator}
        mb={2}
      >
        <option value="axis">Axis</option>
        <option value="xl">XL</option>
        <option value="telkomsel">Telkomsel</option>
        <option value="tri">Tri</option>
        <option value="smartfren">Smartfren</option>
        <option value="indosat">Indosat</option>
      </Select>
      {data?.map((val) => (
        <Box
          w={220}
          shadow="lg"
          rounded={"lg"}
          p={6}
          pr={2}
          pb={2}
          borderWidth="1px"
          borderRadius="lg"
          mb={5}
          onClick={() => handleOrder(val)}
        >
          <Text>{val.nama}</Text>
          <Text fontSize={14}>Rp.{val.harga}</Text>
          <Text
            textAlign={"right"}
            color={"blue.400"}
            fontSize={12}
            fontWeight={"bold"}
          >
            Pesan sekarang
          </Text>
        </Box>
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"90%"}>
          <ModalHeader>{detailPaket?.nama}</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                phone_number: "",
                price: detailPaket.harga,
                name: "",
              }}
              onSubmit={(values, actions) => {
                window.open(
                  `https://api.whatsapp.com/send/?phone=6281218389762&text=No%20Handpone:%20${values.phone_number}%0ANama:%20${values.name}%0APaket:%20${detailPaket.nama}%0AHarga:%20${values.price}&type=phone_number&app_absent=0`
                );
              }}
            >
              {(props) => {
                console.log(props);
                return (
                  <Form onSubmit={props.handleSubmit}>
                    <FormControl
                      isRequired
                      isInvalid={props.errors.name ? true : false}
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
                            error = "Nomor hp minimal 5 angka";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage color={"red"}>
                        {props.errors.name}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={props.errors.phone_number ? true : false}
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
                        {props.errors.phone_number}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl defaultValue={detailPaket.harga}>
                      <FormLabel>Harga</FormLabel>
                      <Field
                        as={Input}
                        id="price"
                        name="price"
                        type="price"
                        variant="filled"
                      />
                    </FormControl>
                    <Button
                      mt={5}
                      type="submit"
                      colorScheme="purple"
                      width="full"
                    >
                      Pesan
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaketData;
