export type Quilt = {
  "version": "0.1.0",
  "name": "quilt",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        },
        {
          "name": "y",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUser",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        },
        {
          "name": "y",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateOne",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "point",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "x",
            "type": "string"
          },
          {
            "name": "y",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: Quilt = {
  "version": "0.1.0",
  "name": "quilt",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        },
        {
          "name": "y",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUser",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        },
        {
          "name": "y",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateOne",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "point",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "x",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "point",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "x",
            "type": "string"
          },
          {
            "name": "y",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
