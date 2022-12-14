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
  Button,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AppContextInterface, AppCtx } from "../../Contex";
import { Field, Form, Formik } from "formik";
import { ConvertCurrency } from "../../utils";

const PaketData = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [dataFilter, setDataFilter] = React.useState<any[]>([]);
  const [operator, setOperator] = React.useState("");
  const [search, setSearch] = React.useState("");
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
        setDataFilter(result);
        setOperator(e.target.value);
        setSearch("");
      }
    }
  };

  const handleOrder = (data: AppContextInterface) => {
    setDetailPaket(data);
    onOpen();
  };

  const findData = (e: any) => {
    const result = dataFilter?.filter((elm) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return elm.nama.toLocaleLowerCase().includes(e.target.value);
    });
    if (result.length > 0) {
      setData(result);
    }
    setSearch(e.target.value);
  };

  return (
    <Box>
      <Text
        fontSize={24}
        textAlign={"center"}
        fontWeight={600}
        mt={"3vh"}
        mb={10}
      >
        Paket Data
      </Text>
      <Select
        placeholder="Pilih Operator"
        width={300}
        onChange={changeOperator}
        mb={2}
        variant="filled"
      >
        <option value="axis">Axis</option>
        <option value="xl">XL</option>
        <option value="telkomsel">Telkomsel</option>
        <option value="tri">3</option>
        <option value="smartfren">Smartfren</option>
        <option value="indosat">Indosat</option>
      </Select>
      <Input
        placeholder="Cari Disini"
        width={300}
        onChange={findData}
        mb={2}
        disabled={!operator}
        value={search}
        variant="filled"
      />
      {data?.map((val) => (
        <Box
          w={300}
          shadow="lg"
          rounded={"lg"}
          p={6}
          pr={2}
          pb={2}
          borderWidth="1px"
          borderRadius="lg"
          mb={5}
          onClick={() => handleOrder(val)}
          background={"blackAlpha.100"}
        >
          <Text>{val.nama}</Text>
          <Text fontSize={14} fontWeight="bold">
             {ConvertCurrency(val.harga)}
          </Text>
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
          <ModalCloseButton />
          <ModalHeader textAlign={"center"}>{detailPaket?.nama}</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                phone_number: "",
                price: detailPaket.harga,
                name: "",
              }}
              onSubmit={(values, actions) => {
                window.open(
                  `https://api.whatsapp.com/send/?phone=6289678229992&text=No%20Handpone:%20${values.phone_number}%0ANama:%20${values.name}%0APaket:%20${detailPaket.nama}%0AHarga:%20${detailPaket.harga}&type=phone_number&app_absent=0`
                );
              }}
            >
              {(props) => {
                return (
                  <Form onSubmit={props.handleSubmit}>
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
                            error = "Nomor hp minimal 5 angka";
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
                        {props.touched.phone_number &&
                          props.errors.phone_number}
                      </FormErrorMessage>
                    </FormControl>
                    <Text mt={5}>Total Harga:   {ConvertCurrency(detailPaket?.harga)}</Text>
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
    </Box>
  );
};

export default PaketData;
