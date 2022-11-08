import 'package:flutter/material.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

class ButtonWidget extends StatelessWidget {
  late String text;
  late Color buttonColor;
  late VoidCallback onPressed;
  late Color textColor;

  ButtonWidget(
      {required this.text,
      required this.buttonColor,
      required this.onPressed,
      required this.textColor});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      minWidth: 275,
      height: 50,
      color: buttonColor,
      child: TextRegular(text: text, fontSize: 18, color: textColor),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(100),
      ),
      onPressed: onPressed,
    );
  }
}
