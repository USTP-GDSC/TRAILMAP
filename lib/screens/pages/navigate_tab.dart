import 'package:flutter/material.dart';

class NavigateTab extends StatelessWidget {
  const NavigateTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Colors.deepPurple,
      ),
      child: const Text("My Awesome Border"),
    );
  }
}
