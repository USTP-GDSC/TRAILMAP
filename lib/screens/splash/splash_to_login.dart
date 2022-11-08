import 'dart:async';

import 'package:flutter/material.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

import '../../auth/login_page.dart';

class LoadingScreenToLogin extends StatefulWidget {
  @override
  _ScreenState createState() => _ScreenState();
}

class _ScreenState extends State<LoadingScreenToLogin> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    Timer(const Duration(seconds: 5), () async {
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const LoginPage()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 30,
                ),
                const Padding(
                  padding: EdgeInsets.all(22.0),
                  child: Image(
                    width: 300,
                    image: AssetImage('assets/images/USTP 1.png'),
                  ),
                ),
                const Expanded(
                  child: SizedBox(),
                ),
                TextRegular(
                    text: 'powered by', fontSize: 10, color: Colors.grey),
                const SizedBox(
                  height: 10,
                ),
                Image.asset(
                  'assets/images/download 1.png',
                  width: 220,
                ),
                const SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
