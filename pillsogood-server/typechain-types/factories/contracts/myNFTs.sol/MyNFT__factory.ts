/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MyNFT,
  MyNFTInterface,
} from "../../../contracts/myNFTs.sol/MyNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600581526020017f4d794e46540000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e46540000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000285565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200029e57607f821691505b60208210811415620002b557620002b462000256565b5b50919050565b612c1980620002cb6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063b88d4fde11610071578063b88d4fde146102a4578063c87b56dd146102c0578063e985e9c5146102f0578063eacabe1414610320578063f2fde38b146103505761010b565b8063715018a6146102425780638da5cb5b1461024c57806395d89b411461026a578063a22cb465146102885761010b565b806323b872dd116100de57806323b872dd146101aa57806342842e0e146101c65780636352211e146101e257806370a08231146102125761010b565b806301ffc9a71461011057806306fdde0314610140578063081812fc1461015e578063095ea7b31461018e575b600080fd5b61012a60048036038101906101259190611aeb565b61036c565b6040516101379190611b33565b60405180910390f35b61014861044e565b6040516101559190611be7565b60405180910390f35b61017860048036038101906101739190611c3f565b6104e0565b6040516101859190611cad565b60405180910390f35b6101a860048036038101906101a39190611cf4565b610526565b005b6101c460048036038101906101bf9190611d34565b61063e565b005b6101e060048036038101906101db9190611d34565b61069e565b005b6101fc60048036038101906101f79190611c3f565b6106be565b6040516102099190611cad565b60405180910390f35b61022c60048036038101906102279190611d87565b610770565b6040516102399190611dc3565b60405180910390f35b61024a610828565b005b61025461083c565b6040516102619190611cad565b60405180910390f35b610272610866565b60405161027f9190611be7565b60405180910390f35b6102a2600480360381019061029d9190611e0a565b6108f8565b005b6102be60048036038101906102b99190611f7f565b61090e565b005b6102da60048036038101906102d59190611c3f565b610970565b6040516102e79190611be7565b60405180910390f35b61030a60048036038101906103059190612002565b610a83565b6040516103179190611b33565b60405180910390f35b61033a600480360381019061033591906120e3565b610b17565b6040516103479190611dc3565b60405180910390f35b61036a60048036038101906103659190611d87565b610b57565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610447575061044682610bdb565b5b9050919050565b60606000805461045d9061216e565b80601f01602080910402602001604051908101604052809291908181526020018280546104899061216e565b80156104d65780601f106104ab576101008083540402835291602001916104d6565b820191906000526020600020905b8154815290600101906020018083116104b957829003601f168201915b5050505050905090565b60006104eb82610c45565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610531826106be565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059990612212565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105c1610c90565b73ffffffffffffffffffffffffffffffffffffffff1614806105f057506105ef816105ea610c90565b610a83565b5b61062f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610626906122a4565b60405180910390fd5b6106398383610c98565b505050565b61064f610649610c90565b82610d51565b61068e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068590612336565b60405180910390fd5b610699838383610de6565b505050565b6106b98383836040518060200160405280600081525061090e565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610767576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075e906123a2565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156107e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d890612434565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61083061104d565b61083a60006110cb565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546108759061216e565b80601f01602080910402602001604051908101604052809291908181526020018280546108a19061216e565b80156108ee5780601f106108c3576101008083540402835291602001916108ee565b820191906000526020600020905b8154815290600101906020018083116108d157829003601f168201915b5050505050905090565b61090a610903610c90565b8383611191565b5050565b61091f610919610c90565b83610d51565b61095e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095590612336565b60405180910390fd5b61096a848484846112fe565b50505050565b606061097b82610c45565b600060066000848152602001908152602001600020805461099b9061216e565b80601f01602080910402602001604051908101604052809291908181526020018280546109c79061216e565b8015610a145780601f106109e957610100808354040283529160200191610a14565b820191906000526020600020905b8154815290600101906020018083116109f757829003601f168201915b505050505090506000610a2561135a565b9050600081511415610a3b578192505050610a7e565b600082511115610a70578082604051602001610a58929190612490565b60405160208183030381529060405292505050610a7e565b610a7984611371565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000610b2161104d565b610b2b60086113d9565b6000610b3760086113ef565b9050610b4384826113fd565b610b4d81846115d7565b8091505092915050565b610b5f61104d565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610bcf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc690612526565b60405180910390fd5b610bd8816110cb565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610c4e8161164b565b610c8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c84906123a2565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610d0b836106be565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d5d836106be565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610d9f5750610d9e8185610a83565b5b80610ddd57508373ffffffffffffffffffffffffffffffffffffffff16610dc5846104e0565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e06826106be565b73ffffffffffffffffffffffffffffffffffffffff1614610e5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e53906125b8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ecc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec39061264a565b60405180910390fd5b610ed78383836116b7565b610ee2600082610c98565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f329190612699565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f8991906126cd565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110488383836116bc565b505050565b611055610c90565b73ffffffffffffffffffffffffffffffffffffffff1661107361083c565b73ffffffffffffffffffffffffffffffffffffffff16146110c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c09061276f565b60405180910390fd5b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611200576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111f7906127db565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516112f19190611b33565b60405180910390a3505050565b611309848484610de6565b611315848484846116c1565b611354576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134b9061286d565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061137c82610c45565b600061138661135a565b905060008151116113a657604051806020016040528060008152506113d1565b806113b084611858565b6040516020016113c1929190612490565b6040516020818303038152906040525b915050919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561146d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611464906128d9565b60405180910390fd5b6114768161164b565b156114b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114ad90612945565b60405180910390fd5b6114c2600083836116b7565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461151291906126cd565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46115d3600083836116bc565b5050565b6115e08261164b565b61161f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611616906129d7565b60405180910390fd5b806006600084815260200190815260200160002090805190602001906116469291906119dc565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b505050565b505050565b60006116e28473ffffffffffffffffffffffffffffffffffffffff166119b9565b1561184b578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261170b610c90565b8786866040518563ffffffff1660e01b815260040161172d9493929190612a4c565b602060405180830381600087803b15801561174757600080fd5b505af192505050801561177857506040513d601f19601f820116820180604052508101906117759190612aad565b60015b6117fb573d80600081146117a8576040519150601f19603f3d011682016040523d82523d6000602084013e6117ad565b606091505b506000815114156117f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ea9061286d565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611850565b600190505b949350505050565b606060008214156118a0576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506119b4565b600082905060005b600082146118d25780806118bb90612ada565b915050600a826118cb9190612b52565b91506118a8565b60008167ffffffffffffffff8111156118ee576118ed611e54565b5b6040519080825280601f01601f1916602001820160405280156119205781602001600182028036833780820191505090505b5090505b600085146119ad576001826119399190612699565b9150600a856119489190612b83565b603061195491906126cd565b60f81b81838151811061196a57611969612bb4565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856119a69190612b52565b9450611924565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b8280546119e89061216e565b90600052602060002090601f016020900481019282611a0a5760008555611a51565b82601f10611a2357805160ff1916838001178555611a51565b82800160010185558215611a51579182015b82811115611a50578251825591602001919060010190611a35565b5b509050611a5e9190611a62565b5090565b5b80821115611a7b576000816000905550600101611a63565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611ac881611a93565b8114611ad357600080fd5b50565b600081359050611ae581611abf565b92915050565b600060208284031215611b0157611b00611a89565b5b6000611b0f84828501611ad6565b91505092915050565b60008115159050919050565b611b2d81611b18565b82525050565b6000602082019050611b486000830184611b24565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611b88578082015181840152602081019050611b6d565b83811115611b97576000848401525b50505050565b6000601f19601f8301169050919050565b6000611bb982611b4e565b611bc38185611b59565b9350611bd3818560208601611b6a565b611bdc81611b9d565b840191505092915050565b60006020820190508181036000830152611c018184611bae565b905092915050565b6000819050919050565b611c1c81611c09565b8114611c2757600080fd5b50565b600081359050611c3981611c13565b92915050565b600060208284031215611c5557611c54611a89565b5b6000611c6384828501611c2a565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611c9782611c6c565b9050919050565b611ca781611c8c565b82525050565b6000602082019050611cc26000830184611c9e565b92915050565b611cd181611c8c565b8114611cdc57600080fd5b50565b600081359050611cee81611cc8565b92915050565b60008060408385031215611d0b57611d0a611a89565b5b6000611d1985828601611cdf565b9250506020611d2a85828601611c2a565b9150509250929050565b600080600060608486031215611d4d57611d4c611a89565b5b6000611d5b86828701611cdf565b9350506020611d6c86828701611cdf565b9250506040611d7d86828701611c2a565b9150509250925092565b600060208284031215611d9d57611d9c611a89565b5b6000611dab84828501611cdf565b91505092915050565b611dbd81611c09565b82525050565b6000602082019050611dd86000830184611db4565b92915050565b611de781611b18565b8114611df257600080fd5b50565b600081359050611e0481611dde565b92915050565b60008060408385031215611e2157611e20611a89565b5b6000611e2f85828601611cdf565b9250506020611e4085828601611df5565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611e8c82611b9d565b810181811067ffffffffffffffff82111715611eab57611eaa611e54565b5b80604052505050565b6000611ebe611a7f565b9050611eca8282611e83565b919050565b600067ffffffffffffffff821115611eea57611ee9611e54565b5b611ef382611b9d565b9050602081019050919050565b82818337600083830152505050565b6000611f22611f1d84611ecf565b611eb4565b905082815260208101848484011115611f3e57611f3d611e4f565b5b611f49848285611f00565b509392505050565b600082601f830112611f6657611f65611e4a565b5b8135611f76848260208601611f0f565b91505092915050565b60008060008060808587031215611f9957611f98611a89565b5b6000611fa787828801611cdf565b9450506020611fb887828801611cdf565b9350506040611fc987828801611c2a565b925050606085013567ffffffffffffffff811115611fea57611fe9611a8e565b5b611ff687828801611f51565b91505092959194509250565b6000806040838503121561201957612018611a89565b5b600061202785828601611cdf565b925050602061203885828601611cdf565b9150509250929050565b600067ffffffffffffffff82111561205d5761205c611e54565b5b61206682611b9d565b9050602081019050919050565b600061208661208184612042565b611eb4565b9050828152602081018484840111156120a2576120a1611e4f565b5b6120ad848285611f00565b509392505050565b600082601f8301126120ca576120c9611e4a565b5b81356120da848260208601612073565b91505092915050565b600080604083850312156120fa576120f9611a89565b5b600061210885828601611cdf565b925050602083013567ffffffffffffffff81111561212957612128611a8e565b5b612135858286016120b5565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061218657607f821691505b6020821081141561219a5761219961213f565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006121fc602183611b59565b9150612207826121a0565b604082019050919050565b6000602082019050818103600083015261222b816121ef565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000602082015250565b600061228e603e83611b59565b915061229982612232565b604082019050919050565b600060208201905081810360008301526122bd81612281565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206e6f7220617070726f766564000000000000000000000000000000000000602082015250565b6000612320602e83611b59565b915061232b826122c4565b604082019050919050565b6000602082019050818103600083015261234f81612313565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b600061238c601883611b59565b915061239782612356565b602082019050919050565b600060208201905081810360008301526123bb8161237f565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b600061241e602983611b59565b9150612429826123c2565b604082019050919050565b6000602082019050818103600083015261244d81612411565b9050919050565b600081905092915050565b600061246a82611b4e565b6124748185612454565b9350612484818560208601611b6a565b80840191505092915050565b600061249c828561245f565b91506124a8828461245f565b91508190509392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612510602683611b59565b915061251b826124b4565b604082019050919050565b6000602082019050818103600083015261253f81612503565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b60006125a2602583611b59565b91506125ad82612546565b604082019050919050565b600060208201905081810360008301526125d181612595565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612634602483611b59565b915061263f826125d8565b604082019050919050565b6000602082019050818103600083015261266381612627565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006126a482611c09565b91506126af83611c09565b9250828210156126c2576126c161266a565b5b828203905092915050565b60006126d882611c09565b91506126e383611c09565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156127185761271761266a565b5b828201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612759602083611b59565b915061276482612723565b602082019050919050565b600060208201905081810360008301526127888161274c565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006127c5601983611b59565b91506127d08261278f565b602082019050919050565b600060208201905081810360008301526127f4816127b8565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612857603283611b59565b9150612862826127fb565b604082019050919050565b600060208201905081810360008301526128868161284a565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006128c3602083611b59565b91506128ce8261288d565b602082019050919050565b600060208201905081810360008301526128f2816128b6565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b600061292f601c83611b59565b915061293a826128f9565b602082019050919050565b6000602082019050818103600083015261295e81612922565b9050919050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b60006129c1602e83611b59565b91506129cc82612965565b604082019050919050565b600060208201905081810360008301526129f0816129b4565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000612a1e826129f7565b612a288185612a02565b9350612a38818560208601611b6a565b612a4181611b9d565b840191505092915050565b6000608082019050612a616000830187611c9e565b612a6e6020830186611c9e565b612a7b6040830185611db4565b8181036060830152612a8d8184612a13565b905095945050505050565b600081519050612aa781611abf565b92915050565b600060208284031215612ac357612ac2611a89565b5b6000612ad184828501612a98565b91505092915050565b6000612ae582611c09565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612b1857612b1761266a565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612b5d82611c09565b9150612b6883611c09565b925082612b7857612b77612b23565b5b828204905092915050565b6000612b8e82611c09565b9150612b9983611c09565b925082612ba957612ba8612b23565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea26469706673582212201aed04f9ca6e44fa48801d911a3be129a225cb42db4629bf608ab13b0fac360964736f6c63430008090033";

type MyNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyNFT__factory extends ContractFactory {
  constructor(...args: MyNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MyNFT> {
    return super.deploy(overrides || {}) as Promise<MyNFT>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MyNFT {
    return super.attach(address) as MyNFT;
  }
  override connect(signer: Signer): MyNFT__factory {
    return super.connect(signer) as MyNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyNFTInterface {
    return new utils.Interface(_abi) as MyNFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MyNFT {
    return new Contract(address, _abi, signerOrProvider) as MyNFT;
  }
}