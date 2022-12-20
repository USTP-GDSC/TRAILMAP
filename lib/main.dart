import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() => runApp(const Main());

class Main extends StatelessWidget {
  const Main({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'USTP Trailmap',
      home: HomeScreen(),
    );
  }
}
