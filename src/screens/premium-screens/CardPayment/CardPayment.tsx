// import {useNavigation} from '@react-navigation/native';
// import {CardField} from '@stripe/stripe-react-native';
// import {fontSizes} from '@typography';
// import KeyboardAwareView from '@ui/KeyboardAwareView/KeyboardAwareView';
// import MaterialInput from '@ui/MaterialInput/MaterialInput';
// import {useFormik} from 'formik';
// import {Button, Text, VStack} from 'native-base';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import * as Yup from 'yup';

// export default function CardPayment({route}: any) {
//   const {price} = route.params;
//   const navigation = useNavigation();
//   const schema = Yup.object().shape({
//     cardholderName: Yup.string().required('Cardholder name is required'),
//     email: Yup.string().required('Email is required'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       cardholderName: '',
//       email: '',
//       cardDetails: {},
//     },
//     onSubmit: async value => {
//       try {
//         navigation.navigate(
//           'PaymentSuccess' as never,
//           {status: 'success'} as never,
//         );
//       } catch (error) {
//         navigation.navigate(
//           'PaymentSuccess' as never,
//           {status: 'error'} as never,
//         );
//       }
//     },
//     // validationSchema: schema,
//   });

//   const {
//     values,
//     touched,
//     errors,
//     handleChange,
//     handleSubmit,
//     handleBlur,
//     setFieldValue,
//   } = formik;

//   return (
//     <KeyboardAwareView>
//       <Text color="primary.100" fontWeight={600} fontSize={fontSizes['2xl']}>
//         Card Payment
//       </Text>
//       <VStack flex={1}>
//         <AntDesign style={{alignSelf: 'center'}} size={100} name="creditcard" />
//         <Text mt="20px" color="gray.400">
//           Card Information
//         </Text>
//         <CardField
//           postalCodeEnabled={false}
//           // autofocus
//           style={{
//             height: 50,
//           }}
//           cardStyle={{
//             textColor: '#1c1c1c',
//           }}
//           onCardChange={cardDetails => {
//             console.log('cardDetails', cardDetails);
//             setFieldValue('cardDetails', cardDetails);
//           }}
//         />
//         <MaterialInput
//           value={values.cardholderName}
//           onChangeText={handleChange('cardholderName')}
//           onBlur={handleBlur('cardholderName')}
//           errorMessage={
//             touched.cardholderName && errors.cardholderName
//               ? errors.cardholderName
//               : ''
//           }
//           label="Cardholder name"
//         />
//         <MaterialInput
//           value={values.email}
//           onChangeText={handleChange('email')}
//           onBlur={handleBlur('email')}
//           errorMessage={touched.email && errors.email ? errors.email : ''}
//           label="Email"
//         />
//       </VStack>

//       <Button
//         variant="primary"
//         disabled={
//           !values.cardDetails.complete ||
//           !values.cardholderName ||
//           !values.email
//         }
//         onPress={handleSubmit}>
//         {price}
//       </Button>
//     </KeyboardAwareView>
//   );
// }

import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const CardPayment = () => {
  const [name, setName] = useState("");
  const stripe = useStripe();

  const subscribe = async () => {
    try {
      // sending request
      const response = await fetch(
        "http://192.168.0.115:3500/api/payment/createPayment",
        {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: name,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Button title="Subscribe - 25 INR" onPress={subscribe} />
    </View>
  );
};

export default CardPayment;
