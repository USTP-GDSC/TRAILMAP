import 'package:flutter/material.dart';
import 'package:ustp_trailmap/screens/splash/splash_to_login.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'USTP Trail Map',
      home: LoadingScreenToLogin(),
    );
  }
}
