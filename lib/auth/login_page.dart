import 'package:flutter/material.dart';
import 'package:ustp_trailmap/screens/home_page.dart';
import 'package:ustp_trailmap/widgets/auth_button.dart';
import 'package:ustp_trailmap/widgets/button_widget.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[150],
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                height: 30,
              ),
              Hero(
                tag: 'ustp-logo',
                child: Image.asset(
                  'assets/images/USTP 1.png',
                  width: 250,
                ),
              ),
              const SizedBox(
                height: 40,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: Image.asset(
                  'assets/images/TRAIL MAP.png',
                  width: 250,
                ),
              ),
              const SizedBox(
                height: 80,
              ),
              ButtonWidget(
                  text: 'Login Anonymously',
                  buttonColor: Colors.black,
                  onPressed: () {
                    Navigator.of(context).pushReplacement(MaterialPageRoute(
                        builder: (context) => const HomePage()));
                  },
                  textColor: Colors.white),
              const SizedBox(
                height: 15,
              ),
              AuthButton(
                  label: 'Login with Google',
                  color: Colors.white,
                  onPressed: () {
                    Navigator.of(context).pushReplacement(MaterialPageRoute(
                        builder: (context) => const HomePage()));
                  },
                  textColor: Colors.black,
                  logo: 'googlelogo'),
              const SizedBox(
                height: 15,
              ),
              AuthButton(
                  label: 'Login with Facebook',
                  color: Colors.blue[700]!,
                  onPressed: () {
                    Navigator.of(context).pushReplacement(MaterialPageRoute(
                        builder: (context) => const HomePage()));
                  },
                  textColor: Colors.white,
                  logo: 'fblogo')
            ],
          ),
        ),
      ),
    );
  }
}
