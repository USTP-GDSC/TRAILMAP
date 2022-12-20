import 'package:flutter/material.dart';
import 'package:tabler_icons/tabler_icons.dart';

class BottomDrawer extends StatelessWidget {
  const BottomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [_sheetIndicator(), _sheetNavigation()],
    );
  }

  Widget _sheetIndicator() {
    return (Padding(
      padding: const EdgeInsets.only(top: 10),
      child: SizedBox(
        width: 40,
        height: 5,
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFDBDBDB),
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    ));
  }

  Widget _sheetNavigation() {
    return Container(
      color: Colors.red,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(25, 25, 25, 0),
        child: Column(
          children: [
            Row(
              children: const [
                (Text(
                  "Navigate",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 34),
                )),
              ],
            ),
            Container(
              margin: const EdgeInsets.only(top: 5),
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(right: 20),
                    child: Column(
                      children: [
                        const Icon(
                          TablerIcons.map_pin,
                          color: Color(0xFFB8B8B8),
                          size: 35,
                        ),
                        Container(
                          margin: const EdgeInsets.only(top: 5, bottom: 5),
                          child: const Icon(
                            TablerIcons.dots_vertical,
                            color: Color(0xFFB8B8B8),
                            size: 35,
                          ),
                        ),
                        const Icon(
                          TablerIcons.building_skyscraper,
                          color: Color(0xFFB8B8B8),
                          size: 35,
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      children: [
                        Container(
                          margin: const EdgeInsets.only(top: 10),
                          child: TextField(
                            decoration: InputDecoration(
                                contentPadding: const EdgeInsets.only(left: 20),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(50.0),
                                  borderSide: const BorderSide(
                                      color: Color(0xFFB8B8B8), width: 0.0),
                                ),
                                // focused look
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(50.0),
                                  borderSide: const BorderSide(
                                      color: Color(0xFFB8B8B8), width: 0.0),
                                ),
                                labelText: 'Your Location',
                                filled: true,
                                hintStyle: TextStyle(color: Colors.grey[800]),
                                fillColor: const Color(0xFFF2F2F2)),
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.only(top: 30),
                          child: TextField(
                            decoration: InputDecoration(
                                contentPadding: const EdgeInsets.only(left: 20),
                                // default look
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(50.0),
                                  borderSide: const BorderSide(
                                      color: Color(0xFFB8B8B8), width: 0.0),
                                ),
                                // focused look
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(50.0),
                                  borderSide: const BorderSide(
                                      color: Color(0xFFB8B8B8), width: 0.0),
                                ),
                                labelText: 'Destination',
                                filled: true,
                                hintStyle: TextStyle(color: Colors.grey[800]),
                                fillColor: const Color(0xFFF2F2F2)),
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20),
              width: double.infinity,
              height: 53,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(TablerIcons.directions),
                label: const Text(
                  'Locate',
                  style: TextStyle(color: Colors.white, fontSize: 17),
                ),
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF9980FA),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    shape: const StadiumBorder()),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
