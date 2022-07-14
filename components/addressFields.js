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
    return arrayOfArrays
}


const AddressFields = () => {

    const [numberOfAddresses, setNumberOfAddresses] = useState(2)
    const [addresses, setAddresses] = useState([])
    const [arrayOfArrays, setArrayOfArrays] = useState([])

    const indexArray = []
    for (let i = 1; i <= numberOfAddresses; i++) {
        indexArray.push(i)
    }

    useEffect(() => {
        if(arrayOfArrays.length)
        {
            setArrayOfArrays([])
        }
    },[addresses])

    const handleAddAddress = () => {
        setNumberOfAddresses(numberOfAddresses + 1)
    }

    const modifyAddress = (address, index) => {
        let newArray = addresses.slice()
        newArray[index] = address
        setAddresses(newArray)
    }

    const handleFindConnection = () => {
        for (let i = 0; i < numberOfAddresses; i++) {
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
                        <>
                            <input className="mt-2 w-[22rem] px-4 py-1.5 text-sm rounded-md" type="text" name={`Address${index}`} placeholder={`Address ${index}`}  onChange={e => modifyAddress(e.target.value, index - 1)} />
                            <br />
                        </>
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
                        <div className="text-white">
                            {arr}
                        </div>
                    ))}
                </div>
            )}
                
            

        </div>
    )
}

export default AddressFields