import type { DocumentData } from './types';

export const sample: DocumentData = [
  {
    "title": "Title",
    "type": "block",
    "children": [
      {
        "type": "h1",
        "children": [
          {
            "text": "Service Agreement"
          }
        ]
      },
      {
        "type": "p",
        "title": "Description",
        "children": [
          {
            "text": "This Service Agreement  (the "
          },
          {
            "bold": true,
            "text": "“Agreement”"
          },
          {
            "text": ") is dated "
          },
          {
            "color": "rgb(20, 170, 245)",
            "type": "mention",
            "title": "Contract Date",
            "variableType": "Date",
            "children": [
              {
                "text": "November 17, 2021"
              }
            ],
            "id": "Contract Date",
            "value": "November 17, 2021"
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "block",
        "title": "Parties",
        "children": [
          {
            "type": "p",
            "children": [
              {
                "bold": true,
                "text": "PARTIES"
              },
              {
                "text": "\n 1.  "
              },
              {
                "color": "rgb(175, 56, 235)",
                "type": "mention",
                "title": "Service Provider's Name",
                "children": [
                  {
                    "text": "Blackmoon"
                  }
                ],
                "id": "Provider",
                "value": "Blackmoon"
              },
              {
                "text": " ("
              },
              {
                "bold": true,
                "text": "“Provider”"
              },
              {
                "text": ").\n 2.  "
              },
              {
                "color": "rgb(175, 184, 59)",
                "type": "mention",
                "title": "Client's Name",
                "children": [
                  {
                    "text": "James Inc"
                  }
                ],
                "id": "Client",
                "value": "James Inc"
              },
              {
                "text": " ("
              },
              {
                "bold": true,
                "text": "“Client”"
              },
              {
                "text": ").\nEach being a "
              },
              {
                "bold": true,
                "text": "“party”"
              },
              {
                "text": " and together being the "
              },
              {
                "bold": true,
                "text": "“parties”"
              },
              {
                "text": "."
              }
            ]
          }
        ]
      },
      {
        "type": "clause",
        "title": "Key Details",
        "children": [
          {
            "type": "h4",
            "title": "Key Details",
            "children": [
              {
                "underline": true,
                "bold": true,
                "text": "Key Details."
              }
            ]
          },
          {
            "type": "ul",
            "title": "Start Date",
            "children": [
              {
                "type": "li",
                "children": [
                  {
                    "type": "lic",
                    "children": [
                      {
                        "bold": true,
                        "text": "Start Date"
                      },
                      {
                        "text": ": "
                      },
                      {
                        "color": "rgb(20, 170, 245)",
                        "type": "mention",
                        "title": "Contract Date",
                        "variableType": "Date",
                        "children": [
                          {
                            "text": "November 17, 2021"
                          }
                        ],
                        "id": "Contract Date",
                        "value": "November 17, 2021"
                      },
                      {
                        "text": "."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "li",
                "children": [
                  {
                    "type": "lic",
                    "children": [
                      {
                        "bold": true,
                        "text": "Term"
                      },
                      {
                        "text": ": "
                      },
                      {
                        "color": "rgb(126, 204, 73)",
                        "type": "mention",
                        "title": "Term",
                        "children": [
                          {
                            "text": "1 year"
                          }
                        ],
                        "id": "Term",
                        "value": "1 year"
                      },
                      {
                        "text": "."
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "clause",
        "title": "Definitions",
        "children": [
          {
            "type": "h4",
            "title": "Definitions",
            "children": [
              {
                "underline": true,
                "bold": true,
                "text": "Definitions."
              },
              {
                "text": " Unless the context requires otherwise, in this Agreement, the following terms shall have the meanings specified:"
              }
            ]
          },
          {
            "type": "clause",
            "title": "Business Day definition",
            "children": [
              {
                "type": "p",
                "children": [
                  {
                    "bold": true,
                    "text": "Business Day"
                  },
                  {
                    "type": "p",
                    "text": " means a day (other than a Saturday, Sunday or public holiday) on which registered banks are open for business in "
                  },
                  {
                    "color": "rgb(250, 208, 0)",
                    "type": "mention",
                    "title": "Governing Law Jurisdiction",
                    "children": [
                      {
                        "text": "Auckland"
                      }
                    ],
                    "id": "Governing Law Jurisdiction",
                    "value": "Auckland"
                  },
                  {
                    "text": "."
                  }
                ]
              }
            ]
          },
          {
            "type": "clause",
            "title": "Charges definition",
            "children": [
              {
                "type": "p",
                "children": [
                  {
                    "bold": true,
                    "text": "Charges"
                  },
                  {
                    "type": "p",
                    "text": " means the Provider’s charges for Services as may be varied from time to time."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "children": [
          {
            "type": "clause",
            "children": [
              {
                "type": "h4",
                "title": "Agreement to Provide Services",
                "children": [
                  {
                    "bold": true,
                    "text": "Agreement to Provide Services"
                  },
                  {
                    "text": "\nThe Provider shall:\n"
                  }
                ]
              },
              {
                "type": "ul",
                "children": [
                  {
                    "type": "li",
                    "children": [
                      {
                        "type": "lic",
                        "children": [
                          {
                            "text": "promptly commence and carry out the Services in a timely, competent, and efficient manner:"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "li",
                    "children": [
                      {
                        "type": "lic",
                        "children": [
                          {
                            "text": "supply all equipment, materials and other resources which are necessary to ensure the Services are performed efficiently;"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "li",
                    "children": [
                      {
                        "type": "lic",
                        "title": "Agreement to Provide Services",
                        "children": [
                          {
                            "text": "work co-operatively with the Client and the Client's employees, agents, and other contractors;\n"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "p",
                "children": [
                  {
            "type": "clause",
            "title": "Business Day definition",
            "children": [
              {
                "type": "p",
                "children": [
                  {
                    "bold": true,
                    "text": "Business Day"
                  },
                  {
                    "type": "p",
                    "text": " means a day (other than a Saturday, Sunday or public holiday) on which registered banks are open for business in "
                  },
                  {
                    "color": "rgb(250, 208, 0)",
                    "type": "mention",
                    "title": "Governing Law Jurisdiction",
                    "children": [
                      {
                        "text": "Auckland"
                      }
                    ],
                    "id": "Governing Law Jurisdiction",
                    "value": "Auckland"
                  },
                  {
                    "text": "."
                  }
                ]
              }
            ]
          },
          {
            "type": "clause",
            "title": "Charges definition",
            "children": [
              {
                "type": "p",
                "children": [
                  {
                    "bold": true,
                    "text": "Charges"
                  },
                  {
                    "type": "p",
                    "text": " means the Provider’s charges for Services as may be varied from time to time."
                  }
                ]
              }
            ]
          },
                    {
            "type": "clause",
            "title": "Charges definition",
            "children": [
              {
                "type": "p",
                "children": [
                  {
                    "bold": true,
                    "text": "Charges"
                  },
                  {
                    "type": "p",
                    "text": " means the Provider’s charges for Services as may be varied from time to time."
                  }
                ]
              }
            ]
          },
                  {
                    "text": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]