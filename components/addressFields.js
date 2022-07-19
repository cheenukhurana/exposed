import { useEffect, useState } from "react"

const findConnection = (addressArray) => {
    const arrayOfArrays = []
    for (let i = 0; i < addressArray.length; i = i + 2) {
        let tempArray = []
        tempArray.push(addressArray[i])
        if (i + 1 < addressArray.length) {
            tempArray.push(addressArray[i + 1])
        }
        arrayOfArrays.push(tempArray)
    }

    // Shorting the length of addresses
    for (let i = 0; i < arrayOfArrays.length; i++) {
        for (let j = 0; j < arrayOfArrays[i].length; j++) {
            if (arrayOfArrays[i][j].length > 13) {
                let temp = arrayOfArrays[i][j].substring(0, 6) + "..." + arrayOfArrays[i][j].substring(arrayOfArrays[i][j].length - 4, arrayOfArrays[i][j].length)
                arrayOfArrays[i][j] = temp
            }
        }
    }

    return arrayOfArrays
}


const AddressFields = () => {

    const [addresses, setAddresses] = useState(["", ""])
    const [arrayOfArrays, setArrayOfArrays] = useState([])
    const [indexArray, setIndexArray] = useState([])

    useEffect(() => {
        if (addresses.length !== indexArray.length) {
            let tempArray = []
            for (let i = 1; i <= addresses.length; i++) {
                tempArray.push(i)
            }
            setIndexArray(tempArray)
        }

        if (arrayOfArrays.length) {
            setArrayOfArrays([])
        }
    }, [addresses])

    const handleAddAddress = () => {
        let tempArray = addresses.slice()
        tempArray.push("")
        setAddresses(tempArray)
    }

    const handleRemoveAddress = (index) => {
        let newArray = addresses.slice()
        newArray.splice(index, 1)
        if (newArray.length >= 2) {
            setAddresses(newArray)
        }
    }

    const modifyAddress = (address, index) => {
        let newArray = addresses.slice()
        newArray[index] = address
        setAddresses(newArray)
    }

    const handleFindConnection = () => {
        for (let i = 0; i < addresses.length; i++) {
            if (!addresses[i]) {
                alert('Enter all addresses')
                return
            }
        }

        setArrayOfArrays(findConnection(addresses))
    }

    return (
        <div>

            <div>
                {
                    indexArray.map(index => (
                        <div className="flex items-center mt-4">
                            <input className="w-[22rem] px-4 py-1.5 text-sm rounded-md" type="text" name={`Address${index}`} placeholder={`Address ${index}`} value={addresses[index - 1]} onChange={e => modifyAddress(e.target.value, index - 1)} />
                            <div onClick={() => handleRemoveAddress(index - 1)}><img className="ml-4 h-5 w-5" src="/remove_button.png" alt="" /></div>
                        </div>
                    ))
                }

            </div>

            <div className="mt-4">
                <button className="bg-[#ea088c] px-4 py-1.5 text-white rounded-md" onClick={handleAddAddress}>Add Address</button>
                <button className="bg-[#ea088c] px-4 py-1.5 ml-4 text-white rounded-md" onClick={handleFindConnection}>Find Connection</button>
            </div>

            {arrayOfArrays.length !== 0 && (
                <div className="mt-4">
                    {arrayOfArrays.map(arr => (
                        <div className="flex content-center mt-6">
                            {
                                arr.map((arrValue, index) => (
                                    <>
                                        <div className="border-white border rounded-lg w-[10rem] h-[8rem] text-white text-center pt-[6%]">{arrValue}</div>
                                        {(index !== (Number(arr.length) - 1)) && (<div className="h-1 w-[4rem] bg-white mt-[7%]"></div>)}
                                    </>
                                ))
                            }
                        </div>
                    ))}
                </div>
            )
            }



        </div >
    )
}

export default AddressFields