import 'package:flutter/material.dart';

import '../../widgets/text_widget.dart';

class BuildingsTab extends StatelessWidget {
  const BuildingsTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(
          height: 40,
        ),
        Center(
          child: Image.asset(
            'assets/images/USTP 1.png',
            height: 150,
          ),
        ),
        const Divider(),
        const SizedBox(
          height: 20,
        ),
        Expanded(
          child: SizedBox(
            child: ListView.builder(
              itemBuilder: ((context, index) {
                return Padding(
                  padding: const EdgeInsets.fromLTRB(30, 0, 30, 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextBold(
                          text: 'Location $index',
                          fontSize: 18,
                          color: Colors.black),
                      const SizedBox(
                        height: 20,
                      ),
                      Container(
                        height: 200,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          boxShadow: const [
                            BoxShadow(
                              blurRadius: 10,
                              color: Colors.grey,
                            ),
                          ],
                          color: Colors.white,
                          border: Border.all(color: Colors.black, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      TextBold(
                          text: 'Images', fontSize: 16, color: Colors.black),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        height: 120,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemBuilder: ((context, index) {
                            return Padding(
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: Container(
                                height: 100,
                                width: 140,
                                decoration: BoxDecoration(
                                  boxShadow: const [
                                    BoxShadow(
                                      blurRadius: 10,
                                      color: Colors.grey,
                                    ),
                                  ],
                                  color: Colors.white,
                                  border:
                                      Border.all(color: Colors.black, width: 2),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                            );
                          }),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      const Divider(),
                    ],
                  ),
                );
              }),
            ),
          ),
        ),
      ],
    );
  }
}
